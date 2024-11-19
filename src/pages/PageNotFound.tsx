import LoadingBackground from '../components/LoadingBackground'
import PageNotFoundPanel from '../components/PageNotFoundPanel'

export const PageNotFound = () => {
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
            <PageNotFoundPanel />
        </div>
    </LoadingBackground>
  )
}