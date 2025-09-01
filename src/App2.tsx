import { useEffect, useState } from "react"

type Notice = {
    id: number;
    name: string;
    message: string;
    time: string;
  };

const App2 = () => {
    const [notices, setNotices] = useState(() => {
        const saved = localStorage.getItem('notices')
        if(saved) {
            return JSON.parse(saved)
        }
        return [{
            id: 1,
            name: "Akintade",
            message: "Meeting at 4 PM",
            time: "27 May, 3:00 PM"
        }]
    })
    const [messageInput, setMessageInput] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [error, setError] = useState('')  // <-- new error state
    const [deletedNotice, setDeletedNotice] = useState(null) // <-- state to hold deleted notices
    const [showUndo, setShowUndo] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {value} = e.target
        setMessageInput(value)
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {value} = e.target
        setNameInput(value)
    }

    function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Validation
        if (!nameInput.trim() && !messageInput.trim()) {
                setError("Name and message cannot be empty")
            return
        } else if(!messageInput.trim()){
            setError("Message cannot be empty")
            return
        } else  if(!nameInput.trim()){
            setError("Name cannot be empty")
            return
        }
       
        
        const timestamp = new Date().toLocaleString(undefined, {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
        const newNotices = {
            id: Date.now(),
            name: nameInput,
            message: messageInput,
            time: timestamp
        }

        setNotices([
            ...notices, newNotices
        ])
        setMessageInput('')
        setNameInput('')
        setError('')  // clear error on success
    }

    useEffect(() => {
        localStorage.setItem('notices', JSON.stringify(notices))
    }, [notices])

    function handleDelete(id: number) {
        const confirm = window.confirm("Are you sure you want to delete this notice?")
        if (confirm) {
        // proceed with deletion
        const updatedNotices = notices.filter((notice: Notice) => notice.id !== id)
        const DeletedNotice = notices.find((notice: Notice) => notice.id === id)
        setDeletedNotice(DeletedNotice)
        setNotices(updatedNotices)
        setShowUndo(true)
        }
        
    }

    useEffect(() => {
        if(error){
            const timer = setTimeout(() => {
                setError('')
            }, 2000)

            return () => clearTimeout(timer)
        }
    })

    //useeffect for the undo button
    useEffect(() => {
        if (showUndo) {
            const timer = setTimeout(() => {
                setShowUndo(false);  // Hide Undo button after 5 seconds
                setDeletedNotice(null);  // Clear deletedNotice after timeout
            }, 5000);
    
            // Cleanup timer if component unmounts or showUndo changes
            return () => clearTimeout(timer);
        }
    }, [showUndo]);

    //handler to control the undo button
    function handleUndo() {
        if (deletedNotice) {
            setNotices((prev) => [...prev, deletedNotice]);  // Add back the deleted notice
            setDeletedNotice(null);
            setShowUndo(false);
        }
    }

    return (
        <div style={{ maxWidth: 900, fontFamily: 'Arial, sans-serif' }} className="mt-20 mx-auto p-10 lg:p-0">
            <h1 className="text-center font-bold text-2xl mb-10">NoticeBoard 1.0</h1>
            <form onSubmit={handleClick} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label htmlFor="name" className="text-[14px]">Name</label>
                <input
                    id="name"
                    type="text"
                    value={nameInput}
                    placeholder="Type your name here"
                    onChange={handleNameChange}
                    style={{ padding: '8px', fontSize: '1rem' }}
                    className="border border-gray-500 rounded-2xl placeholder:text-[13px]"
                />

                <label htmlFor="message" className="text-[14px]">Message</label>
                <input
                    id="message"
                    type="text"
                    placeholder="Type your notice here"
                    onChange={handleChange}
                    value={messageInput}
                    style={{ padding: '8px', fontSize: '1rem' }}
                    className="border border-gray-500 rounded-2xl placeholder:text-[13px]"
                />

                <button type="submit" style={{ padding: '10px', fontSize: '1rem', opacity: (!nameInput.trim() || !messageInput.trim()) ? 0.5 : 1,cursor: (!nameInput.trim() || !messageInput.trim() ? 'not-allowed' : 'pointer')}} className="rounded-lg border bg-green-700 text-white p-2" disabled={!nameInput.trim() || !messageInput.trim()}>
                    Add Notice
                </button>
            </form>

            {/* Error message */}
            {error && (
                <p style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </p>
            )}

            {/* Notice list */}
            <div style={{ marginTop: '20px' }} className="lg:flex lg:gap-2 lg:flex-wrap">
                {notices.map((notice: Notice) => (
                    <div
                        key={notice.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '12px',
                            backgroundColor: '#f9f9f9',
                        }}
                        className="w-full lg:w-[49%]  p-2 bg-white shadow rounded"
                    >
                        <h2 style={{ margin: '0 0 6px' }} className="font-bold border-b border-b-gray-600"><span className="text-[12px]">owner:</span> {notice.name}</h2>
                        <p style={{ margin: '0 0 4px' }} className="pt-2">{notice.message}</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#555' }}>{notice.time}</p>
                        <button onClick={() => handleDelete(notice.id)} className="px-4 py-2 mt-2 bg-red-300 text-white text-sm rounded-lg border-gray-50 hover:bg-red-700"> Delete</button>
                    </div>
                ))}
            </div>
            {
               
                    showUndo && deletedNotice && <button onClick={handleUndo}>Undo</button>
               
                
            }
        </div>
    )
}

export default App2