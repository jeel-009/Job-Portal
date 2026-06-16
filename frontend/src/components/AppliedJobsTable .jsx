import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";



const AppliedJobsTable = () => {
  const { AllappliedJobs } = useSelector(store => store.job)
  return (
    <div className="border rounded-lg p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {AllappliedJobs.map((a) => (
            <TableRow key={a._id}>
              <TableCell>{a?.createdAt?.split('T')[0]}</TableCell>
              <TableCell>{a?.job?.title}</TableCell>
              <TableCell>{a?.job?.companyId?.name}</TableCell>
              <TableCell>
                <Badge className={`${a?.status === 'rejected' ? 'bg-red-500' : a?.status === 'pending' ? 'bg-gray-400' : 'bg-green-500'}`}>{a?.status.toUpperCase()}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;