/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // webpack（svgファイルの読み込み）の設定
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // 圧縮無効
          },
        },
      ],
    });
    return config;
  },
  // images: {
  //   // svgへの型付けのため画像に関するデフォルトの型定義を無効化
  //   // https://zenn.dev/catnose99/articles/49c12f84182bdf
  //   disableStaticImages: true,
  // },

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
