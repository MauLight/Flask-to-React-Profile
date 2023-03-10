"""empty message

Revision ID: 61c979ab9600
Revises: afb0ea0fc2c2
Create Date: 2022-12-27 19:40:24.000881

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '61c979ab9600'
down_revision = 'afb0ea0fc2c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scripts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('length', sa.String(length=250), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scripts', schema=None) as batch_op:
        batch_op.drop_column('length')

    # ### end Alembic commands ###
