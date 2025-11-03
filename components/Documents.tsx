import React, { useState, useCallback, useEffect } from 'react';
import { type Folder, type Doc, type FolderData, type DocData, type User } from '../types';
import { FolderIcon, DocumentIcon, PlusIcon, SparklesIcon, TrashIcon } from './Icons';
import { generateText } from '../services/geminiService';
import Modal from './Modal';
import { canCreate, canDelete, canUpdate } from '../utils/permissions';

interface DocumentsProps {
    user: User;
    folders: Folder[];
    docs: Doc[];
    onAddFolder: (folderData: FolderData) => void;
    onDeleteFolder: (id: string) => void;
    onAddDoc: (docData: DocData) => void;
    onUpdateDoc: (doc: Doc) => void;
    onDeleteDoc: (id: string) => void;
}

const Documents: React.FC<DocumentsProps> = ({ user, folders, docs, onAddFolder, onDeleteFolder, onAddDoc, onUpdateDoc, onDeleteDoc }) => {
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(folders[0]?.id || null);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const canUserCreate = canCreate(user, 'Document');
    const canUserDelete = canDelete(user, 'Document');
    const canUserUpdate = canUpdate(user, 'Document');


    useEffect(() => {
        if (!folders.some(f => f.id === selectedFolderId)) {
            setSelectedFolderId(folders[0]?.id || null);
        }
    }, [folders, selectedFolderId]);
    
    const selectedDoc = docs.find(d => d.id === selectedDocId);
    const docsInSelectedFolder = docs.filter(d => d.folderId === selectedFolderId);

    const handleDocContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!selectedDoc || !canUserUpdate) return;
        onUpdateDoc({ ...selectedDoc, content: e.target.value });
    };

    const handleGenerateText = useCallback(async () => {
        if (!aiPrompt || !selectedDoc) return;
        setIsGenerating(true);
        const generatedContent = await generateText(aiPrompt);
        const currentContent = selectedDoc.content;
        const newContent = currentContent ? `${currentContent}\n\n---\n\n${generatedContent}` : generatedContent;
        onUpdateDoc({ ...selectedDoc, content: newContent });
        setIsGenerating(false);
        setIsAiModalOpen(false);
        setAiPrompt('');
    }, [aiPrompt, selectedDoc, onUpdateDoc]);

    const handleAddFolderClick = () => {
        const name = prompt("Enter new folder name:");
        if (name) {
            onAddFolder({ name });
        }
    };

    const handleAddDocClick = () => {
        if (!selectedFolderId) return;
        const name = prompt("Enter new document name:");
        if (name) {
            onAddDoc({ name, content: '', folderId: selectedFolderId });
        }
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] space-x-4">
            {/* Folders Pane */}
            <div className="w-1/4 bg-slate-800 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Folders</h2>
                    {canUserCreate && <button onClick={handleAddFolderClick} className="text-slate-400 hover:text-white"><PlusIcon className="h-5 w-5" /></button>}
                </div>
                <ul className="space-y-2 overflow-y-auto">
                    {folders.map(folder => (
                        <li key={folder.id} className="group">
                            <div className={`w-full flex items-center rounded-md transition-colors ${selectedFolderId === folder.id ? 'bg-sky-500 text-white' : 'hover:bg-slate-700'}`}>
                                <button
                                    onClick={() => { setSelectedFolderId(folder.id); setSelectedDocId(null); }}
                                    className="flex-grow flex items-center p-2 text-left"
                                >
                                    <FolderIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                                    <span className="font-medium truncate">{folder.name}</span>
                                </button>
                                {canUserDelete && (
                                    <button onClick={() => onDeleteFolder(folder.id)} className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Documents Pane */}
            <div className="w-1/4 bg-slate-800 rounded-xl p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-white">Documents</h2>
                    {canUserCreate && <button onClick={handleAddDocClick} className="text-slate-400 hover:text-white disabled:text-slate-600" disabled={!selectedFolderId}><PlusIcon className="h-5 w-5" /></button>}
                </div>
                {selectedFolderId && (
                    <ul className="space-y-2 overflow-y-auto">
                        {docsInSelectedFolder.map(doc => (
                           <li key={doc.id} className="group">
                                <div className={`w-full flex items-center rounded-md transition-colors ${selectedDocId === doc.id ? 'bg-slate-600 text-white' : 'hover:bg-slate-700'}`}>
                                    <button
                                        onClick={() => setSelectedDocId(doc.id)}
                                        className="flex-grow flex items-center p-2 text-left"
                                    >
                                        <DocumentIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                                        <span className="truncate">{doc.name}</span>
                                    </button>
                                    {canUserDelete && (
                                        <button onClick={() => onDeleteDoc(doc.id)} className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Editor Pane */}
            <div className="w-2/4 bg-slate-800 rounded-xl p-4 flex flex-col">
                {selectedDoc ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="text-lg font-bold text-white truncate pr-4">{selectedDoc.name}</h2>
                             {canUserUpdate && (
                                <button onClick={() => setIsAiModalOpen(true)} className="flex items-center bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex-shrink-0">
                                    <SparklesIcon className="h-5 w-5 mr-2" />
                                    AI Assistant
                                </button>
                             )}
                        </div>
                        <textarea
                            key={selectedDoc.id}
                            value={selectedDoc.content}
                            onChange={handleDocContentChange}
                            readOnly={!canUserUpdate}
                            className="w-full h-full bg-slate-900 rounded-md p-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                            placeholder="Start writing..."
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-slate-500">Select a document to view or edit.</p>
                    </div>
                )}
            </div>
            
            <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="AI Assistant">
                <div className="space-y-4">
                    <p>Enter a prompt to generate text. The result will be appended to your document.</p>
                    <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        className="w-full h-32 bg-slate-700 rounded-md p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                        placeholder="e.g., Write a follow-up email to a client..."
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleGenerateText}
                            disabled={isGenerating || !aiPrompt}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? 'Generating...' : 'Generate Text'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Documents;
