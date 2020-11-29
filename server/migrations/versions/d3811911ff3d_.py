"""empty message

Revision ID: d3811911ff3d
Revises: e2786f25ece2
Create Date: 2020-11-22 19:22:34.491247

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3811911ff3d'
down_revision = 'e2786f25ece2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tests', 'email')
    op.drop_column('tests', 'test_name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tests', sa.Column('test_name', sa.VARCHAR(length=100), autoincrement=False, nullable=True))
    op.add_column('tests', sa.Column('email', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    # ### end Alembic commands ###