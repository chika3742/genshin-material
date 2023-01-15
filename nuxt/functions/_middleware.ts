export const onRequest: PagesFunction = async({next}) => {
  const response = await next()
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000")
  return response
}
