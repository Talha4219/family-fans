import { getMessages, updateMessageStatus, deleteMessage } from "@/lib/actions";
import {
  Mail,
  MessageSquare,
  Clock,
  Trash2,
  CheckCircle,
  Eye,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import React from "react";
export default async function AdminMessagesPage() {
  const messages = await getMessages();
  return (
    <div className="space-y-8 animate-fade-in">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {" "}
        <div>
          {" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tight mb-2">
            Customer Inbox
          </h1>{" "}
          <p className="text-slate-500 font-medium">
            Manage and respond to customer inquiries from the contact form.
          </p>{" "}
        </div>{" "}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          {" "}
          <div className="flex items-center gap-2 px-4 py-2 bg-lime-50 text-lime-700 rounded-xl">
            {" "}
            <Mail className="w-4 h-4" />{" "}
            <span className="text-xs font-black uppercase tracking-widest">
              {messages.length} Total
            </span>{" "}
          </div>{" "}
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl">
            {" "}
            <CheckCircle className="w-4 h-4" />{" "}
            <span className="text-xs font-black uppercase tracking-widest">
              {messages.filter((m: any) => m.status === "read").length} Read
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Messages List */}{" "}
      <div className="grid grid-cols-1 gap-6">
        {" "}
        {messages.length > 0 ? (
          messages.map((msg: any) => (
            <div
              key={msg._id}
              className={`group bg-white rounded-[2.5rem] border transition-all duration-300 overflow-hidden ${msg.status === "new" ? "border-lime-200 shadow-xl shadow-lime-600/5" : "border-slate-100 hover:border-slate-200 shadow-sm"}`}
            >
              {" "}
              <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10">
                {" "}
                {/* Sender Info */}{" "}
                <div className="lg:w-1/4 space-y-6">
                  {" "}
                  <div className="flex items-center gap-4">
                    {" "}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-colors ${msg.status === "new" ? "bg-lime-50 border-lime-200 text-lime-600" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                    >
                      {" "}
                      <User className="w-6 h-6" />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <h3 className="font-black text-[zinc-950] text-lg leading-tight uppercase tracking-tighter">
                        {msg.name}
                      </h3>{" "}
                      <p className="text-xs font-medium text-slate-400 truncate max-w-[150px]">
                        {msg.email}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="space-y-3">
                    {" "}
                    <div className="flex items-center gap-3 text-slate-400">
                      {" "}
                      <Calendar className="w-3.5 h-3.5" />{" "}
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {" "}
                        {new Date(msg.createdAt).toLocaleDateString()}{" "}
                      </span>{" "}
                    </div>{" "}
                    <div className="flex items-center gap-3 text-slate-400">
                      {" "}
                      <Tag className="w-3.5 h-3.5" />{" "}
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${msg.status === "new" ? "bg-lime-600 text-white" : "bg-slate-100 text-slate-500"}`}
                      >
                        {" "}
                        {msg.status}{" "}
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                {/* Content */}{" "}
                <div className="flex-1 space-y-4">
                  {" "}
                  <h4 className="text-xl font-black text-[zinc-950] tracking-tight flex items-center gap-3">
                    {" "}
                    <span className="text-lime-600">Sub:</span>{" "}
                    {msg.subject}{" "}
                  </h4>{" "}
                  <p className="text-slate-500 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    "{msg.message}"{" "}
                  </p>{" "}
                </div>{" "}
                {/* Actions */}{" "}
                <div className="lg:w-48 flex lg:flex-col gap-3 justify-center lg:border-l lg:border-slate-50 lg:pl-10">
                  {" "}
                  <form
                    action={async () => {
                      "use server";
                      await updateMessageStatus(msg._id, "read");
                    }}
                  >
                    {" "}
                    <button className="w-full btn-secondary !py-3 !px-5 flex items-center justify-center gap-2 !bg-emerald-50 !text-emerald-600 border-none hover:!bg-emerald-100 transition-colors">
                      {" "}
                      <Eye className="w-4 h-4" />{" "}
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Mark Read
                      </span>{" "}
                    </button>{" "}
                  </form>{" "}
                  <form
                    action={async () => {
                      "use server";
                      await deleteMessage(msg._id);
                    }}
                  >
                    {" "}
                    <button className="w-full btn-secondary !py-3 !px-5 flex items-center justify-center gap-2 !bg-red-50 !text-red-500 border-none hover:!bg-red-100 transition-colors">
                      {" "}
                      <Trash2 className="w-4 h-4" />{" "}
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Trash
                      </span>{" "}
                    </button>{" "}
                  </form>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
            {" "}
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              {" "}
              <MessageSquare className="w-10 h-10 text-slate-200" />{" "}
            </div>{" "}
            <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase tracking-tighter">
              Inbox Empty
            </h3>{" "}
            <p className="text-slate-400 font-medium">
              No customer messages found. Time to relax!
            </p>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
