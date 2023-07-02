import { useState } from 'react'

export const Upload = () => {
	const [files, setFiles] = useState([])

	const handleFileUpload = event => {
		const uploadedFiles = Array.from(event.target.files)
		setFiles(uploadedFiles)
	}
	return (
		<>
			<div>
				<input type='file' multiple onChange={handleFileUpload} />
				<div>
					{files.map((file, index) => (
						<div key={index}>
							<span>{file.name}</span>
							<span>{file.uploaded ? 'Uploaded' : 'Not uploaded'}</span>
							{file.uploaded && (
								<a href={file.downloadUrl} download>
									Download
								</a>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	)
}
