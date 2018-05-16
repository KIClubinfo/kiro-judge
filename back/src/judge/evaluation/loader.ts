export class Loader {
  static getInstancePath(instancePath: string) {
    return __dirname + '/instances/' + instancePath;
  }

  static getSubjectPath(subjectPath: string) {
    return __dirname + '/subjects/' + subjectPath;
  }
}
