export async function login(usr, pw) {
  try {
    const res = await fetch('http://localhost:3001/log', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usr: usr,
        pw: pw
      }),
    })
    const body = await res.json()
    return await body
  } catch (error) {
    console.error(error)
    return false
  }

}

export async function reg(usr, pw, name,isAdmin) {
  return await fetch('http://localhost:3001/reg', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usr: usr,
      pw: pw,
      name: name,
      isAdmin: isAdmin
    })
  }).then(async (res) => {
    return await res.json();
  }).catch((err) => {
    console.error(err)
    return err
  })
}

export async function list(){
  try{
    const res = await fetch('http://localhost:3001/logged', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        act: 'list',
      })
    })
    const body = await res.json()
    return body
  } catch (error){
    console.log(error)
    throw error;
  }
}

export async function alter(usr,newusr){
  try{
    const res = await fetch('http://localhost:3001/logged', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        act: 'alt',
        usr: usr,
        newusr: newusr.usr,
        newnam: newusr.name,
        newadm: newusr.isAdmin})
      })
    const body = await res.json()
    return body
  } catch (error){
    console.log(error)
    throw error;
  }}

  export async function del(usr){
    try{
      const res = await fetch('http://localhost:3001/logged', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          act: 'del',
          usr: usr})
        })
      const body = await res.json()
      return body
    } catch (error){
      console.log(error)
      throw error;
    }
}