"""Definition of block model
"""

from django.db import models
import json

from .block_manager import BlockManager

class BlockModel(models.Model):
    """Representation of a code block
    """
    objects = BlockManager()

    name = models.TextField(
        verbose_name="name of a block")

    identifiers = models.TextField(
        verbose_name="unique identifier(s) of a block(s) used internally")

    price = models.IntegerField(
        help_text="number of currency units required to buy this block",
        default=0)

    difficulty = models.FloatField(
        help_text="real number between -1 (easiest) and 1 (most difficult)",
        default=1.)

    def __str__(self):
        return '[{pk}] {name}'.format(pk=self.pk, name=self.name)

    def to_json(self):
        """Returns JSON (dictionary) representation of the block.
        """
        block_dict = {
            'block-id': self.pk,
            'name': self.name,
            'identifiers': json.loads(self.identifiers),
            'price': self.price
        }
        return block_dict