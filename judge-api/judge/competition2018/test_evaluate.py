import unittest
import os

from judge.competition2018.evaluate import Instance


class TestInstance(unittest.TestCase):
    def test_class(self):
        file_path = os.path.join('fixtures', 'instance.in')
        with open(file_path, 'r') as file:
            instance = Instance(file)

        self.assertEqual(instance.V, 7)
        self.assertEqual(instance.A, 8)
        self.assertEqual(instance.P, 3)
        self.assertEqual(instance.B, 500)
        self.assertEqual(instance.K, 5)
        self.assertEqual(instance.G, 100)

        self.assertEqual(len(instance.legs), 7)
        self.assertListEqual(instance.legs[0], [12, 15, 10])
        self.assertListEqual(instance.legs[6], [1, 3, 2])

        self.assertEqual(len(instance.correspondences), 8)
        self.assertListEqual(instance.correspondences[0], [1, 3, 1, 5])
        self.assertListEqual(instance.correspondences[7], [4, 7, 1, 3])
