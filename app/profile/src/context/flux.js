const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,

      message: null,

      credentials: '',

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
            alert("There was an error");
            return false;
          }

          const data = await resp.json();
          console.log("access_token: " + data.access_token);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
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
      },
    },
  };
};

export default getState;
