const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,

      allUsers: [],

      user_id: null,

      scriptId: '',

      hasScripts: true,

      message: null,

      credentials: '',

      user: {},

      userScripts: [],

      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      login: async (email, password) => {
        console.log(email);
        console.log(password);
        const store = getStore();
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            "http://127.0.0.1:5000/api/token",
            opts
          );
          if (resp.status !== 200) {
            alert("Incorrect email or password");
            return false;
          }

          const data = await resp.json();
          console.log(data);
          console.log(data.user_id);
          console.log("access_token: " + data.token);
          sessionStorage.setItem("token", data.token);
          setStore({ token: data.token, user_id: data.user_id });
          console.log(store.user_id);
          return true;
        } catch (error) {
          console.error("There was an error in your request");
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("logged out!");
        setStore({ token: null });
      },

      setScriptId: (id) => {
        setStore({ scriptId: id });
        console.log(id);
      },

      hasScripts: () => {
        setStore({ hasScripts: false });
      },

      getMessage: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };

        fetch(
          "http://127.0.0.1:5000/api/hello",
          opts
        )
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      getUsers: async () => {
        const store = getStore();
        const url = `http://127.0.0.1:5000/api/users`;
        const opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + store.token,
          },
        }
        try {
          const response = await fetch(url, opts);
          const data = await response.json();
          console.log(data);
          setStore({ allUsers: data });
          console.log(store.allUsers);
        }
        catch (error) {
          console.log(error);
        }
      },

      getUserandScripts: async () => {
        const store = getStore();
        console.log(store.user_id);
        const url = `http://127.0.0.1:5000/api/user/${store.user_id}`;
        const opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + store.token,
          },
        }
        try {
          const response = await fetch(url, opts);
          const data = await response.json();
          console.log(data)
          setStore({ user: data })
          console.log(store.user);
          setStore({ userScripts: data.myscripts })
          setStore({ user_id: data.id })
        }
        catch (error) {
          console.log(error);
        }
      },

      getCredentials: async () => {
        const store = getStore();
        console.log(store.token);
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };

        fetch(
          "http://127.0.0.1:5000/api/user",
          opts
        )
          .then((resp) => resp.json())
          .then((data) => setStore({ credentials: data.user }))

          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
        console.log(store.credentials);
      },
    },
  };
};

export default getState;
