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
    public partial class Form2 : Form
    {
        public Form2(string text1, string text2, decimal value, bool difficult)
        {
            string[] employees = new string[]{"1", "2", "3", "4", "5", "6", "7", "8", "9"};

            InitializeComponent();

            this.SuspendLayout();

            label1.Text = "Ученик: " + text1 + "\n" + "Класс: " + text2;
            label1.Location = new Point(3, 3);
            int n = Convert.ToInt32(value);
            for (int i = 0; i < n; i++)
            {
                if (difficult)
                {
                    Random rand = new Random((int)DateTime.Now.Ticks);

                    Label t = new Label();
                    ComboBox combo = new ComboBox();
                    t.Text = "текст задания " + (i + 1);

                    int x, y;
                    x = 20;
                    y = i * 30;
                    t.Location = new Point(x, y + 40);
                    combo.Location = new Point(x + 100, y + 40);
                    combo.DropDownStyle = ComboBoxStyle.DropDownList;
                    combo.Items.AddRange(employees);
                    combo.Text = rand.Next(9).ToString();

                    this.Controls.Add(t);
                    this.Controls.Add(combo);

                } else {
                CheckBox t = new CheckBox();
                t.Text = "текст задания " + (i + 1);

                int x, y;
                x = 20;
                y = i * 30;
                t.Location = new Point(x, y + 40);

                this.Controls.Add(t);  }
            }
        }

        private void Label1_Click(object sender, EventArgs e)
        {

        }
    }
}
