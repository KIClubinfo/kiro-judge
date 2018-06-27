import unittest
import os

from judge.competition2018.evaluate import Instance, Solution, check_solution


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


class TestSolution(unittest.TestCase):
    def test_solution(self):
        str0 = "p 1 v 1"
        str1 = "p 1 v 1 4 6\np 2 v 2 3\np 3 v 5 7"

        solution0 = Solution(str0)
        self.assertEqual(len(solution0.planes), 1)
        self.assertEqual(len(solution0.rotations), 1)
        self.assertListEqual(solution0.planes, [1])
        self.assertListEqual(solution0.rotations[0], [1])

        solution1 = Solution(str1)
        self.assertEqual(len(solution1.planes), 3)
        self.assertEqual(len(solution1.rotations), 3)
        self.assertListEqual(solution1.planes, [1, 2, 3])
        self.assertListEqual(solution1.rotations[0], [1, 4, 6])
        self.assertListEqual(solution1.rotations[1], [2, 3])
        self.assertListEqual(solution1.rotations[2], [5, 7])


class TestCheckSolution(unittest.TestCase):
    def setUp(self):
        file_path = os.path.join('fixtures', 'instance.in')
        with open(file_path, 'r') as file:
            self.instance = Instance(file)

    # no error
    def test_check_fine(self):
        solution = Solution("p 1 v 1 4 6\np 2 v 2 3\np 3 v 5 7")
        check_solution(self.instance, solution)

    # no duplicated planes
    def test_plane_duplicate(self):
        with self.assertRaises(Exception):
            solution = Solution("p 1 v 1 4 6\np 1 v 2 3")
            check_solution(self.instance, solution)

    # no duplicated planes
    def test_plane_bound(self):
        with self.assertRaises(Exception):
            solution = Solution("p 0 v 1 4 6")
            check_solution(self.instance, solution)

    # leg bounds
    def test_leg_bounds(self):
        with self.assertRaises(Exception):
            solution = Solution("p 1 v 0")
            check_solution(self.instance, solution)
        with self.assertRaises(Exception):
            solution = Solution("p 1 v 8")
            check_solution(self.instance, solution)

    # legs must follow the graph
    def test_leg_graph(self):
        with self.assertRaises(Exception):
            solution = Solution("p 1 v 1 2")
            check_solution(self.instance, solution)
        with self.assertRaises(Exception):
            solution = Solution("p 1 v 1 3 4")
            check_solution(self.instance, solution)
