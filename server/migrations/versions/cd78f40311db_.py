"""empty message

Revision ID: cd78f40311db
Revises: 6284046d5762
Create Date: 2020-11-16 22:38:33.930455

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cd78f40311db'
down_revision = '6284046d5762'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('public_id', sa.String(length=100), nullable=True))
    op.create_unique_constraint(None, 'users', ['public_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_column('users', 'public_id')
    # ### end Alembic commands ###
