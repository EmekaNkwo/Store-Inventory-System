import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { notification } from 'antd';
import autoTable from 'jspdf-autotable';

interface ExportOptions {
  headers?: string[];
  title?: string;
}

export const exportToCSV = (data: object[], filename: string) => {
  if (!data || data.length === 0) {
    notification.error({
      message: 'Error',
      description: 'No data available for export',
    });
    return;
  }

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const exportToPDF = (
  data: object[],
  filename: string,
  options: ExportOptions = {}
) => {
  if (!data || data.length === 0) {
    notification.error({
      message: 'Error',
      description: 'No data available for export',
    });
    return;
  }

  const doc = new jsPDF();

  // Add title if provided
  if (options.title) {
    doc.setFontSize(18);
    doc.text(options.title, 14, 22);
  }

  // Determine headers (use provided or extract from first data object)
  const headers = options.headers || Object.keys(data[0]);

  // Convert data to array of values
  const tableData = data.map((item) =>
    headers.map((header) => item[header as keyof typeof item] || '')
  );

  // Generate table
  autoTable(doc, {
    startY: options.title ? 30 : 20,
    head: [headers],
    body: tableData,
    theme: 'striped',
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
    },
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
};
