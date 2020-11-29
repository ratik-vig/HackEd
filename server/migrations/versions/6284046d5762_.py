"""empty message

Revision ID: 6284046d5762
Revises: 4736035f4bb3
Create Date: 2020-11-14 00:03:02.802510

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6284046d5762'
down_revision = '4736035f4bb3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('results',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('test_id', sa.Integer(), nullable=True),
    sa.Column('responses', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('test_name', sa.String(length=100), nullable=True),
    sa.Column('answers', sa.JSON(), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tests')
    op.drop_table('results')
    # ### end Alembic commands ###