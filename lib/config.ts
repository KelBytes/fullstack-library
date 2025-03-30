const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    productionApiEndpoint: process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
    emailjs: {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    },
  },
};

export default config;
