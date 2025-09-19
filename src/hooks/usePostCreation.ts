import { useState, useEffect } from "react"

export const usePostCreation = (onPostCreated: () => void) => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [postContent, setPostContent] = useState("")
  const [character, setCharacter] = useState("")
  const [series, setSeries] = useState("")
  const [costume, setCostume] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Clean up preview URLs
  useEffect(() => {
    return () => {
      previewUrls.forEach(URL.revokeObjectURL)
    }
  }, [previewUrls])

  const addMedia = (files: File[]) => {
    const newFiles = [...mediaFiles, ...files]
    setMediaFiles(newFiles)
    
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const removeMedia = (index: number) => {
    const newFiles = [...mediaFiles]
    newFiles.splice(index, 1)
    setMediaFiles(newFiles)
    
    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
  }

  const handleSubmit = async () => {
    if (mediaFiles.length === 0) return
    
    setIsSubmitting(true)
    
    try {
      // In a real app, you would upload the files and post data to your API
      // Example API call:
      /*
      const formData = new FormData()
      mediaFiles.forEach((file, index) => {
        formData.append(`media-${index}`, file)
      })
      formData.append('content', postContent)
      formData.append('character', character)
      formData.append('series', series)
      formData.append('costume', costume)
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        // Reset form
        setMediaFiles([])
        setPreviewUrls([])
        setPostContent("")
        setCharacter("")
        setSeries("")
        setCostume("")
        onPostCreated()
      }
      */
      
      // For demo purposes, just simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form
      setMediaFiles([])
      setPreviewUrls([])
      setPostContent("")
      setCharacter("")
      setSeries("")
      setCostume("")
      onPostCreated()
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    mediaFiles,
    previewUrls,
    postContent,
    character,
    series,
    costume,
    isSubmitting,
    addMedia,
    removeMedia,
    setPostContent,
    setCharacter,
    setSeries,
    setCostume,
    handleSubmit,
  }
}