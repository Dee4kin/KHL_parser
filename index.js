const axios = require('axios')
const cheerio = require('cheerio')

async function getInfo() {
  try {
    const siteUrl = 'https://www.khl.ru/game/1217/885657/protocol/'
    const { data }= await axios({
      method: 'GET',
      url: siteUrl,
    })
    
    const $ = cheerio.load(data)

    const elemSelector = '.fineTable-totalTable-wrapper' 
    

    $(elemSelector).each((index, el) => {
    
      
      const arr  = []

      arr.push({
        // teams: $(el).find('.member-link').text().replace(/[\r\n\t\s]+/g,"  "),
        // score_and_time: $(el).find('.cl-left.red').text().replace(/[\r\n\t\s]+/g,"  "),
        num: index,
        team_1_name: $(el).find('a[class="table-ftf__header-club table-ftf__header-club_left fineTable-header__item"]').text().replace(/\n/g, ' ').trim(), // Team 1
        team_2_name: $(el).find('a[class="table-ftf__header-club table-ftf__header-club_right fineTable-header__item"]').text().replace(/\n/g, ' ').trim(), // Team 1
        stats: $(el).find('div[class="fineTable-totalTable d-none_768"]').children().children().children().text().replace(/\n/g, ' '), // Team 1

      });

      console.log(arr.filter(val => val.num === 0))
      
    }
    )
    
   // console.log(data)
  } catch (error) {
    console.error(error)
  }
}

getInfo()


