import moment, {Moment} from "moment"

export function getResinRecoveryTime(currentCount: number, baseTime: Moment | undefined): Moment | undefined {
  if (currentCount >= 160 || baseTime === undefined) { return undefined }
  const date = baseTime.clone()
  date.add((160 - currentCount) * 8, "minutes")

  return date
}

export function getResinRecoveryRemainingMinutes(currentCount: number, baseTime: Moment | undefined): number | undefined {
  const resinRecoveryTime = getResinRecoveryTime(currentCount, baseTime)
  if (currentCount >= 160 || resinRecoveryTime === undefined) { return undefined }
  return resinRecoveryTime.diff(moment(), "minutes")
}
