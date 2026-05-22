import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import ThemeInput from "./ThemeInput.jsx"
import LoadingStatus from "./LoadingStatus.jsx"
import {API_BASE_URL} from "../util.js"

function StoryGenerator() {
    const navigate = useNavigate()
    const [theme, setTheme] = useState("")
    const [jobId, setJobId] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchStory = async (id) => {
        navigate(`/story/${id}`)
    }

    const waitForNextPoll = () => new Promise((resolve) => {
        setTimeout(resolve, 5000)
    })

    const pollJobStatus = async (id) => {
        while (true) {
            try {
                const response = await axios.get(`${API_BASE_URL}/jobs/${id}`)
                const {status, story_id, error: jobError} = response.data

                if (status === "completed" && story_id) {
                    setLoading(false)
                    await fetchStory(story_id)
                    return
                }

                if (status === "failed" || jobError) {
                    setError(jobError || "Failed to generate story")
                    setLoading(false)
                    return
                }
            } catch (e) {
                if (e.response?.status !== 404) {
                    setError(`Failed to check story status: ${e.message}`)
                    setLoading(false)
                    return
                }
            }

            await waitForNextPoll()
        }
    }

    const generateStory = async (theme) => {
        setLoading(true)
        setError(null)
        setTheme(theme)
        setJobId(null)

        try {
            const response = await axios.post(`${API_BASE_URL}/stories/create`, {theme})
            const {job_id} = response.data
            setJobId(job_id)

            await pollJobStatus(job_id)
        } catch (e) {
            setLoading(false)
            setError(`Failed to generate story: ${e.message}`)
        }
    }

    const reset = () => {
        setJobId(null)
        setError(null)
        setTheme("")
        setLoading(false)
    }

    return <div className="story-generator">
        {error && <div className="error-message">
            <p>{error}</p>
            <button onClick={reset}>Try Again</button>
        </div>}

        {!jobId && !error && !loading && <ThemeInput onSubmit={generateStory}/>} 

        {loading && <LoadingStatus theme={theme} />}
    </div>
}

export default StoryGenerator