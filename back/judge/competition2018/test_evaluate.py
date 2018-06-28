import unittest
import os

from judge.competition2018.evaluate import Instance, Solution, check_solution, evaluate_solution


class TestInstance(unittest.TestCase):
    def test_class(self):
        file_path = os.path.join('fixtures', 'instance.in')
        with open(file_path, 'r') as f:
            instance = Instance(f)

        self.assertEqual(7, instance.V)
        self.assertEqual(8, instance.A)
        self.assertEqual(3, instance.P)
        self.assertEqual(500, instance.B)
        self.assertEqual(5, instance.K)
        self.assertEqual(100, instance.G)

        self.assertEqual(7, len(instance.legs))
        self.assertListEqual([12, 15, 10], instance.legs[0])
        self.assertListEqual([1, 3, 2], instance.legs[6])

        self.assertEqual(8, len(instance.correspondences))
        self.assertListEqual([1, 3, 1, 5], instance.correspondences[0])
        self.assertListEqual([4, 7, 1, 3], instance.correspondences[7])


class TestSolution(unittest.TestCase):
    def test_solution(self):
        str0 = "p 1 v 1"
        str1 = "p 1 v 1 4 6\np 2 v 2 3\np 3 v 5 7"

        solution0 = Solution(str0)
        self.assertEqual(1, len(solution0.planes))
        self.assertEqual(1, len(solution0.rotations))
        self.assertListEqual([1], solution0.planes)
        self.assertListEqual([1], solution0.rotations[0])

        solution1 = Solution(str1)
        self.assertEqual(3, len(solution1.planes))
        self.assertEqual(3, len(solution1.rotations))
        self.assertListEqual([1, 2, 3], solution1.planes)
        self.assertListEqual([1, 4, 6], solution1.rotations[0])
        self.assertListEqual([2, 3], solution1.rotations[1])
        self.assertListEqual([5, 7], solution1.rotations[2])


class TestCheckSolution(unittest.TestCase):
    def setUp(self):
        file_path = os.path.join('fixtures', 'instance.in')
        with open(file_path, 'r') as f:
            self.instance = Instance(f)

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


class TestEvaluateSolution(unittest.TestCase):
    def setUp(self):
        file_path = os.path.join('fixtures', 'instance.in')
        with open(file_path, 'r') as f:
            self.instance = Instance(f)

    def test_case0(self):
        solution = Solution("p 1 v 1")
        # leg 1 : plane 1 = cost 12
        # 6 legs not done = cost 3000
        # no maintenance = cost 0
        # no repeated legs = cost 0
        # total cost 3012
        score = evaluate_solution(self.instance, solution)
        self.assertEqual(3012, score)

    def test_case1(self):
        solution = Solution("p 1 v 1 4")
        # leg 1 : plane 1 = cost 12
        # leg 4 : plane 1 = cost 2
        # 5 legs not done = cost 2500
        # no maintenance = cost 0
        # no repeated legs = cost 0
        # total cost 2514
        score = evaluate_solution(self.instance, solution)
        self.assertEqual(2514, score)

    def test_case3(self):
        solution = Solution("p 1 v 1 4\np 2 v 4")
        # leg 1 : plane 1 = cost 12
        # leg 4 : plane 1 = cost 2
        # leg 4 : plane 2 = cost 3
        # 5 legs not done = cost 2500
        # no maintenance = cost 0
        # 1 leg is done twice = cost 500
        # total cost 3017
        score = evaluate_solution(self.instance, solution)
        self.assertEqual(3017, score)

    def test_case4(self):
        # no base in this test case to provoke maintenance cost
        for correspondence in self.instance.correspondences:
            correspondence[2] = 0
        self.instance.correspondences[1][3] = self.instance.K

        solution = Solution("p 1 v 1 4 7")
        # leg 1 : plane 1 = cost 12
        # leg 4 : plane 1 = cost 2
        # leg 7 : plane 1 = cost 1
        # 4 legs not done = cost 2000
        # 2 legs not maintained = cost 200
        # no repeated legs = cost 0
        # total cost 2215
        score = evaluate_solution(self.instance, solution)
        self.assertEqual(2215, score)
