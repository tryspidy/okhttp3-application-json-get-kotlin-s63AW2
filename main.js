val BASE_URL = "https://api.unsplash.com"
val ACCESS_KEY = "..."

val path = "/photos/$id"
val uri = Uri.parse(BASE_URL)
    .buildUpon()
    .appendEncodedPath(path)
    //.appendPath(path)
    .build()

val client = OkHttpClient()
val request = Request.Builder()
    .url(uri.toString())
    .addHeader("Accept-Version", "v1")
    .addHeader("Authorization", "Client-ID $ACCESS_KEY")
    .get()
    .build()

val response = client.newCall(request).execute()
val jsonDataString = response.body()?.string()

val json = JSONObject(jsonDataString)
if (!response.isSuccessful) {
    val errors = json.getJSONArray("errors").join(", ")
    throw Exception(errors)
}
val rawUrl = json.getJSONObject("urls").getString("raw")
