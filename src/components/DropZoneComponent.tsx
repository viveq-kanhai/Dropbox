"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function DropZoneComponent() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted!");
      reader.onerror = () => console.log("File reading was failed!");

      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);
    const toastId = toast.loading("Uploading file...");

    // Upload doc naar db
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userid: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    //upload upload doc naar storage
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    //maak een download url van doc in storage
    await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      //voeg downloadurl toe aan doc in db
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    toast.success("File uploaded successfully", {
      id: toastId,
    });
    setLoading(false);
  };
  // max file size 20mb
  const maxSize = 20971520;
  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate800/50 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DropZoneComponent;
