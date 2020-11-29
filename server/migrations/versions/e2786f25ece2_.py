"""empty message

Revision ID: e2786f25ece2
Revises: 9d8227315937
Create Date: 2020-11-22 16:08:37.494954

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2786f25ece2'
down_revision = '9d8227315937'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tests', sa.Column('answers', sa.PickleType(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tests', 'answers')
    # ### end Alembic commands ###