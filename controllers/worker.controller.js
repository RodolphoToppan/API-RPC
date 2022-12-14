const axios = require('axios')
const rpcUrl = 'https://epg-api.video.globo.com/programmes/1337?date='

module.exports = {
  async getRpcprogramming(req, res) {
    let programingParse = []
    let timers = {
      date: req.date,
      time: req.time
    }

    console.log(rpcUrl + timers.date)
    let caller = await axios.get(rpcUrl + timers.date)
    let resp = caller.data.programme.entries
    //TAKE UTILIZABLE INFO
    for (let prog of resp) {
      let programing = {
        title: prog.program.name,
        description: prog.description,
        start: prog.start_time,
        end: prog.end_time,
        mainImg: prog.custom_info.Graficos.ImagemURL,
        logoImg: prog.custom_info.Graficos.LogoURL
      }
      programingParse.push(programing)
    }

    return programingParse
  }
}
