import {UserSettings} from "#shared/user-settings"
import {createSimpleDataConverter} from "~/utils/create-simple-data-converter"

export const userDocumentConverter = createSimpleDataConverter<UserSettings>()
