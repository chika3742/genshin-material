import {UserDocument} from "../../shared-types/user-document"
import {createSimpleDataConverter} from "~/utils/create-simple-data-converter"

export const userDocumentConverter = createSimpleDataConverter<UserDocument>()
