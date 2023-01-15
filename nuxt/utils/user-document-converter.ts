import {createSimpleDataConverter} from "~/utils/create-simple-data-converter"
import {UserDocument} from "~/types/user-document"

export const userDocumentConverter = createSimpleDataConverter<UserDocument>()
