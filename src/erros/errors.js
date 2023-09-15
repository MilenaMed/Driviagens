function conflict() {
  return {
    type: "conflictCity",
    message: `This city has already been added!`
  }
}
export const errors = {
  conflict,
}