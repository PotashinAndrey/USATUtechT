using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace labKbab5
{
    public partial class MainForm : Form
    {
        Data data = new Data();
        public MainForm()
        {
            InitializeComponent();
            data.LoadConfig();
            data.ReadFromFile("");
            richTextBox1.Text = data.Text;
            this.ShowMatch();
        }   

        private void МенюToolStripMenuItem_Click(object sender, EventArgs e)
        {
                
        }

        private void OpenFile(object sender, EventArgs e)
        {
            OpenFileDialog dlg = new OpenFileDialog();
            dlg.Filter = "txt files (*.txt)|*.txt|All files (*.*)|*.*"; // расширения
            dlg.FilterIndex = 1;
            DialogResult res = dlg.ShowDialog(); //
            if (res == DialogResult.OK)
                { data.ReadFromFile(dlg.FileName);
                data.FileName = dlg.FileName;
                }
            richTextBox1.Text = data.Text;
        }

        private void RichTextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void Button1_Click(object sender, EventArgs e)
        {
            data.Find(textBox1.Text);
            data.AddHistory(textBox1.Text);
            ShowHistory();
            this.ShowMatch();
        }

        private void ShowMatch()
        {
            Match m = data.Match;// получить m из data, добавить using
            if (m != null && m.Success)
            {
                richTextBox1.SelectionBackColor = Color.White;
                richTextBox1.SelectionStart = m.Index;
                richTextBox1.SelectionLength = m.Value.Length;
                richTextBox1.ScrollToCaret();
                richTextBox1.SelectionBackColor = Color.Yellow;
                richTextBox2.Text = $"Найдено[{m.Index}]: ##{m.Value}##\n";
            }
        }

        private void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void TextBox1_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                data.Find(textBox1.Text);
                data.AddHistory(textBox1.Text);
                ShowHistory();
                this.ShowMatch();
                e.SuppressKeyPress = true; // дальше событие нажатие кнопки игнорируется
            }
        }

        private void Button2_Click(object sender, EventArgs e)
        {

            data.Next();
            this.ShowMatch();   
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            data.SaveConfig();  
        }

        private void ShowHistory()
        {
            listBox1.DataSource = null;
            listBox1.DataSource = data.History.Reverse().ToList();

        }

        private void ListBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBox1.SelectedIndex > -1)
            {
                textBox1.Text = listBox1.Items[listBox1.SelectedIndex].ToString();
                data.Find(textBox1.Text);
                ShowMatch();
            }
        }

        private void ОтдельныйПункиToolStripMenuItem_Click(object sender, EventArgs e)
        {
            new StatisticsForm(data.FirstLetterCounts()).Show();
        }

        /*private void RichTextBox1_KeyDown(object sender, KeyEventArgs e)
        {
            base.OnKeyDown(e);
            if (e.KeyCode == Keys.LControlKey && e.O)
            {
                MessageBox.Show("Тест");
                e.Handled = true;
            }
        }*/
    }
}
