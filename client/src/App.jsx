import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useForm } from "react-hook-form";

const App = () => {
  const socket = useMemo(() => io("localhost:3000"), []);
  const [socketId, setSocketId] = useState("");
  const [recievedMessages, setReceivedMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setSocketId(socket.id);
      socket.on("welcome", (s) => {
        console.log(s);
      });
    });
    socket.on("received", (data) => {
      console.log("new message:", data);
      setReceivedMessages((prevMessage) => [...prevMessage, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    socket.emit("message-sent", data.message, data.receiver);
    reset()
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center flex-col">
        <h1>{socketId}</h1>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2">
            <label htmlFor="receiver">To: </label>
            <input
              {...register("receiver", {
                required: "Please enter a socket id",
              })}
              type="text"
              id="receiver"
              className="border-2 border-blue-800 rounded-xl"
            />
            {errors.receiver && (
              <p className="text-red-500">{errors.receiver.message}</p>
            )}
          </div>
          <div className="flex gap-2">
            <label htmlFor="message">Message</label>
            <input
              {...register("message", {
                required: "Please enter a message",
              })}
              type="text"
              id="message"
              className="border-2 border-blue-800 rounded-xl"
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-800 hover:bg-white px-2 py-1 rounded-xl text-white hover:text-black border-blue-800 border-2"
          >
            Send Message
          </button>
        </form>
      </div>
      {recievedMessages.length > 0
        ? recievedMessages.map((message) => <p>{message}</p>)
        : "No messages to show"}
    </div>
  );
};

export default App;
