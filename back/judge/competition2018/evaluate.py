from typing import Tuple, TextIO


class Instance:
    def __init__(self, file: TextIO):
        lines = file.readlines()
        lines = [line.decode().rstrip() for line in lines]

        # first line is meta data
        metadata = lines[0].split(' ')

        if len(metadata) != 12:
            raise Exception("[INSTANCE] Wrong meta data length in instance, must be 12.")

        self.V = int(metadata[1])
        self.A = int(metadata[3])
        self.P = int(metadata[5])
        self.B = int(metadata[7])
        self.K = int(metadata[9])
        self.G = int(metadata[11])

        # leg cost per plane
        self.legs = []

        for line in lines[1:1+self.V]:
            data = line.split(' ')
            costs = [int(x) for x in data[3:]]

            if len(costs) != self.P:
                raise Exception("[INSTANCE] Leg needs to have exactly one cost per plane.")

            self.legs.append(costs)

        # possible correspondences between legs
        self.correspondences = []

        for line in lines[1+self.V:]:
            data = line.split(' ')

            if len(data) < 4:
                continue

            o = int(data[3])
            d = int(data[5])
            t = int(data[7])
            n = int(data[9])
            correspondence = [o, d, t, n]

            self.correspondences.append(correspondence)


class Solution:
    def __init__(self, solution: str):
        lines = solution.split('\n')
        split_lines = [line.split(' ') for line in lines if len(line) > 0]

        self.planes = [int(split_line[1]) for split_line in split_lines]
        self.rotations = [[int(x) for x in split_line[3:] if x != ''] for split_line in split_lines]


def prepare_eval_data(instance_file: TextIO, solution_str: str) -> Tuple[Instance, Solution]:
    return Instance(instance_file), Solution(solution_str)


def check_solution(instance: Instance, solution: Solution) -> bool:
    # data for check
    V = instance.V
    P = instance.P
    correspondences = instance.correspondences
    planes = solution.planes
    rotations = solution.rotations

    # 0. (just in case) planes and rotations must have same length
    if len(planes) != len(rotations):
        raise Exception("Weird error : planes and rotations must have same length, please contact an admin.")

    # 1. check declared planes
    #   a. no duplicates
    if len(set(planes)) != len(planes):
        raise Exception("A plane has more than one rotation defined !")

    #   b. bounds
    if any(map(lambda x: x <= 0 or x > P, planes)):
        raise Exception("A plane has an index out of range !")

    # 2. check declared legs
    #   a. bounds
    def has_leg_out_of_bounds(rotation):
        return any([leg <= 0 or leg > V for leg in rotation])

    if any(map(has_leg_out_of_bounds, rotations)):
        raise Exception("A plane has an index out of range !")

    #   b. legs in a rotation must follow the graph
    for rotation in rotations:
        for i, leg in enumerate(rotation[:-1]):
            leg_after = rotation[i+1]
            correspondence_exists = any([o == leg and d == leg_after for (o, d, t, n) in correspondences])
            if not correspondence_exists:
                raise Exception('A rotation has two legs following one each other that are not supposed to !')

    return True


def evaluate_solution(instance: Instance, solution: Solution) -> int:
    V = instance.V
    B = instance.B
    K = instance.K
    G = instance.G
    legs_planes_costs = instance.legs
    correspondences = instance.correspondences
    planes = solution.planes
    rotations = solution.rotations

    # per leg cost with planned plane
    legs_cost = 0
    unmaintained_cost = 0
    for plane, rotation in zip(planes, rotations):
        plane_array_id = plane -1
        state = 0
        for l, leg in enumerate(rotation):
            leg_array_id = leg - 1
            leg_cost = legs_planes_costs[leg_array_id][plane_array_id]
            legs_cost += leg_cost

            if l > 0:
                leg_before = rotation[l-1]
                night, time = next(((n, t) for (o, d, n, t) in correspondences if o == leg_before and d == leg))
                if night == 1:
                    state = 0
                else:
                    state += time
                if state >= K:
                    unmaintained_cost += G

    # legs not done
    done_legs = []
    for rotation in rotations:
        done_legs += rotation
    done_legs_set = set(done_legs)
    not_done_legs_cost = abs(len(done_legs_set) - V) * B

    # repeated legs
    repeated_legs_cost = 0
    for leg in done_legs_set:
        repeated_leg_count = len(list(filter(lambda x: x == leg, done_legs))) - 1
        repeated_legs_cost += repeated_leg_count * B

    # total cost
    cost = legs_cost + unmaintained_cost + not_done_legs_cost + repeated_legs_cost

    # worst cost
    worst_cost = V*B

    return worst_cost - cost
