import axios from 'axios';

interface discordArgs {
  weather: {
    weather: string;
    temp: string;
  };
  news: string;
  date: string;

  url: string;
}

export default async({ weather, news, date, url }: discordArgs) => {
  const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');

  let message: any = {
    username: '편지봇',
    avatar_url: 'https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg',
    content:  `<@462355431071809537> - 📨 ${today} 편지가 왔어요!`,
    embeds: [],
  };

  message.embeds.push({
    fields: [
      {
        name: '📅 날짜 / 한국',
        value: `${today} ${date ? '(' + date + ')' : ''}`,
        inline: true
      },
      {
        name: '🏞️ 날씨 / Rio de Janeiro',
        value: weather.weather,
        inline: true
      },
      {
        name: '🌡 온도 / Rio de Janeiro',
        value: weather.temp,
        inline: true
      }
    ],
    footer: {
      text: '제작자 : 재웜',
      icon_url: 'https://images-ext-2.discordapp.net/external/GyQicPLz_zQO15bOMtiGTtC4Kud7JjQbs1Ecuz7RrtU/https/cdn.discordapp.com/embed/avatars/1.png'
    },
  });

  message.embeds.push({
    title: '📰 뉴스 / 구글',
    description: news
  });

  await axios.post(url, message);
};
