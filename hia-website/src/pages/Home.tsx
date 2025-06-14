import '../App.css'
import './Home.css'
import image_7 from "../assets/image_7.png"

function Home() {
    return ( 
        <>
        {/*Hero Section*/}
        <section className='gradient-section'>
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
        </section>
        {/*Statistics*/}
        <section className='stat-background'>
            <div className='stat-layout'>
                <h1>The Reality of Food Insecurity</h1>
                <p style={{color: 'white', fontSize: '1.5rem', marginBottom: '4rem'}}>These aren't just numbers—they represent real students in our community who need our support.</p>
            </div>
            <div className='card-layout'>
                <div className='card'>
                    <div className='card-title'>40%</div>
                    <div className='card-desc'>Fall asleep in class or can't focus due to hunger</div>
                </div>
                <div className='card'>
                    <div className='card-title'>13%</div>
                    <div className='card-desc'>Have failed assignments because they didn't have enough to eat</div>
                </div>
                <div className='card'>
                    <div className='card-title'>25%</div>
                    <div className='card-desc'>Students struggle to afford their next meal</div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Home;