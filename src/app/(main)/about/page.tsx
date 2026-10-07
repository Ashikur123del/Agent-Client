import AboutHero from '@/components/About/AboutHero'
import WhoWeAre from '@/components/About/WhoWeAre'
import MissionVision from '@/components/About/MissionVision'
import AboutFeatures from '@/components/About/AboutFeatures'
import TeamSection from '@/components/About/TeamSection'
import Statistics from '@/components/About/Statistics'
import AboutCTA from '@/components/About/AboutCTA'

const AboutPage = () => {
  return (
    <div>
        <AboutHero />
        <WhoWeAre />
        <MissionVision />
        <AboutFeatures />
        <TeamSection />
        <Statistics />
        <AboutCTA />
    </div>
  )
}

export default AboutPage