import { Button } from 'react-bootstrap';

async function handleUploadFile() {
    console.log("asdkfja;sdlkj;kl");
    await window.darkMode.uploadFile()
}

function Home() {
    return (
        <div>
        <h1>Hello, world!</h1>
        <Button variant="Primary" onClick={handleUploadFile} >Upload File</Button>
        </div>
        
    );
  }
  
  export default Home;
  