using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsLab1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            radioButton1.Checked = true;

        }

        private void TableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void TextBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void TextBox4_TextChanged(object sender, EventArgs e)
        {

        }

        private void Label1_Click(object sender, EventArgs e)
        {

        }

        private void Label2_Click(object sender, EventArgs e)
        {

        }

        private void Label3_Click(object sender, EventArgs e)
        {

        }

        private void ComboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }

        private void GroupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void NumericUpDown1_ValueChanged(object sender, EventArgs e)
        {

        }

        private void RadioButton1_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void Button1_Click(object sender, EventArgs e)
        {
            if (textBox1.Text.Length == 0 && textBox2.Text.Length == 0 && textBox3.Text.Length == 0)
            {
                MessageBox.Show("Есть не заполненые поля!");
                return;
            }

            Form form2 = new Form2(textBox1.Text, comboBox1.Text, numericUpDown1.Value, radioButton1.Checked);
            form2.ShowDialog();
        }

        private void TableLayoutPanel3_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
