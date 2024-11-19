import LoadingBackground from '../components/LoadingBackground'
import NoServicePanel from '../components/NoServicePanel'

export const NoServicesPage = () => {
  return (
    <LoadingBackground doneLoading={false}>
        <div
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                height:'100%',
            }}
        >
            <NoServicePanel />
        </div>
    </LoadingBackground>
  )
}