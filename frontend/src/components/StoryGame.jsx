import {useState} from 'react';

function StoryGame({story, onNewStory}) {
    const [currentNodeId, setCurrentNodeId] = useState(story?.root_node?.id || null);

    const currentNode = currentNodeId && story?.all_nodes ? story.all_nodes[currentNodeId] : null;
    const isEnding = currentNode?.is_ending || false;
    const isWinningEnding = currentNode?.is_winning_ending || false;
    const options = (!isEnding && currentNode?.options?.length > 0) ? currentNode.options : [];

    const chooseOption = (optionId) => {
        setCurrentNodeId(optionId)
    }

    const restartStory = () => {
        if (story && story.root_node) {
            setCurrentNodeId(story.root_node.id)
        }
    }

    return <div className="story-game">
        <header className="story-header">
            <h2>{story.title}</h2>
        </header>

        <div className="story-content">
            {currentNode && <div className="story-node">
                <p>{currentNode.content}</p>

                {isEnding ?
                    <div className="story-ending">
                        <h3>{isWinningEnding ? "Congratulations" : "The End"}</h3>
                        {isWinningEnding ? "You reached a winning ending" : "Your adventure has ended."}
                    </div>
                    :
                    <div className="story-options">
                        <h3>What will you do?</h3>
                        <div className="options-list">
                            {options.map((option, index) => {
                                return <button
                                        key={option.next_node_id ?? index}
                                        onClick={() => chooseOption(option.next_node_id ?? option.node_id)}
                                        className="option-btn"
                                        >
                                        {option.text}
                                    </button>
                            })}
                        </div>
                    </div>
                }
            </div>}

            <div className="story-controls">
                <button onClick={restartStory} className="reset-btn">
                    Restart Story
                </button>
            </div>

            {onNewStory && <button onClick={onNewStory} className="new-story-btn">
                New Story
            </button>}

        </div>
    </div>
}

export default StoryGame