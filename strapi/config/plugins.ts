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
          folder: "/assets",
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
            pre: "l-text,i-Flat,fs-bw_div_10,ff-Montserrat,co-333333,lx-bw_div_10,ly-bw_div_10,l-end:l-text,i-20%25%20OFF,fs-bw_div_7.5,ff-Montserrat,co-333333,tg-b,lx-bw_div_10,ly-bw_div_5,l-end:l-text,i-on%20all%20products,fs-bw_div_10,ff-Montserrat,co-333333,lx-bw_div_10,ly-bw_div_3.2,l-end",
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
