import {useRouter} from 'next/router'

function Result() {
  const router = useRouter()

  if (!router.isReady) return;

  const result = router.query.pwnresult

  return <div>Result: {result}</div>
}
  
export default Result;