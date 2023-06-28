export async function login(usr, pw){
  fetch('http://localhost:3001/log', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({
      usr: usr,
      pw: pw
    }),
  }).then((res) => {
    if(res.status === 200){
      const jwt = res.headers['x-access-token']
      console.log(jwt)
    }
  }).catch((err) => {
    console.error(err)
  })
}

export async function reg(usr, pw, name){
    fetch('http://localhost:3001/reg', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usr:usr,
        pw: pw,
        name: name/*,
        isAdmin: isAdmin*/
      })
    }).then((res) => {
        if (res.status == 200){
            const jwt = res.headers['x-access-token']
        console.log(jwt)}
    }).catch((err) => {
        console.error(err)
    })
  } 
