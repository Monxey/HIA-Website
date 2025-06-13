import './App.css'
import Header from './components/Header'
import image_7 from "./assets/image_7.png"

function App() {
  return (
    <>
      <Header />
      {/*Hero Section*/}
      <div className='gradient-section'>
        <div className='grid'>
          <div style={{maxWidth: '600px'}}>
            <h1 style={{textAlign: 'left', fontSize: '36px'}}>Fighting Food Insecurity at{" "}
            <span style={{color: '#f08080'}}>UMD</span>
            </h1>
            <p style={{fontSize: '24px', textAlign: 'left', color: 'var(--gray-primary)'}}>
              Over 27% of UMD students face food insecurity. That's 1 in 4 of our peers 
              struggling to afford their next meal. Join Hearts in Action to break this cycle.
            </p>
          </div>
          <div style={{position: 'relative'}}>
            <img src={image_7} alt="image_7" style={{borderRadius: '0.5rem', border: '0.15rem solid white'}} />
            <div className="caption">
              <span style={{fontSize: '1.5rem', color: '#f08080'}}><b>27%</b></span>
              <div>of UMD students face food insecurity</div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
