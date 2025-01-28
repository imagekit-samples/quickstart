module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-imagekitio",
      providerOptions: {
        publicKey: env("PUBLIC_KEY"),
        privateKey: env("PRIVATE_KEY"),
        urlEndpoint: env("URL_ENDPOINT"),

        // Optional
        uploadOptions: {
          folder: "/path",
          useUniqueFileName: true,
          tags: ["tag1", "tag2"],
          checks: `"file.size" < "1mb"`,
          isPrivateFile: false,
          customCoordinates: "1,2,3,4",
          webhookUrl: "https://testwebook.com",
          extensions: [
            {
              name: "google-auto-tagging",
              maxTags: 5,
              minConfidence: 95,
            },
          ],
          transformation: {
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "l-text,i-Imagekit,fs-50,l-end",
              },
            ],
          },
          customMetadata: { test: "value" },
        },
      },
    },
  },
  // ...
});
