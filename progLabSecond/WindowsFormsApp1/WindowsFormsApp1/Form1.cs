﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        static Random rnd = new Random();
        RandomObjectFactory rof = new RandomObjectFactory();
        TwoTypeFactory ttf = new TwoTypeFactory();

        static GraphObject rand()
        {
            if (rnd.Next(10) >= 5) return new Rectangle();
            return new Ellipse();
        }

        public Form1()
        {
            InitializeComponent();
        }
          
        private List<GraphObject> elements = new List<GraphObject>();

        private void QToolStripMenuItem_Click(object sender, EventArgs e)
        {
                
        }

        private void ToolStrip1_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {

        }

        private void ToolStripButton1_Click(object sender, EventArgs e)
        {
            Exit();    
        }

        private void ToolStripButton2_Click(object sender, EventArgs e)
        {
            selectiveAdd();
            //AddFigure();
        }

        private void ToolStripButton3_Click(object sender, EventArgs e)
        {
            ClearFigures(true);
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void ВыходToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Exit();
        }

        private void ДобавитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            selectiveAdd();
        }

        private void ОчиститьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ClearFigures(true);
        }

        private void ДобавитьToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            selectiveAdd();

            //AddFigure();
        }

        private void ОтчиститьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ClearFigures();
        }

        public void Exit()
        {
            this.Close();
        }

        public void AddFigure()
        {
            elements.Add(rand());
            panel1.Invalidate();
        }

        public void selectiveAdd()
        {
            IGraphicFactory igf;
            if (radioButton1.Checked)
            {
                igf = rof;
            }
            else
            {
                igf = ttf;
            }

            elements.Add(igf.CreateGraphObject());
            panel1.Invalidate();
        }

        public void ClearFigures(bool all = false)
        {
            if (all)
            {
                elements.RemoveAll(item => item.w > 0);
                panel1.Invalidate();
                return;
            }

            foreach (GraphObject elem in elements)
            {
                if (elem.Selected) { elem.Deleted = true; }
            }

            elements.RemoveAll(e => e.Deleted);
                panel1.Invalidate();
        }

        private void Panel1_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            GraphObject temp = rand();
            temp.X = e.X;
            temp.Y = e.Y;
            elements.Add(temp);
            panel1.Refresh();
        }

        private void Panel1_Paint(object sender, PaintEventArgs e)
        {
            foreach (GraphObject elem in elements)
            {
                elem.Draw(e.Graphics);
            }
        }

        private void Panel1_MouseDown(object sender, MouseEventArgs e)
        {
            GraphObject temp = null;
            if (Form.ModifierKeys == Keys.Control)
            {
                foreach (GraphObject elem in elements)
                {
                    if (elem.ContainsPoint(e.Location))
                    {
                        elem.Selected = true;
                        panel1.Invalidate();

                    }
                }
                return;
            }
            panel1.Invalidate();
            foreach (GraphObject elem in elements)
            {
                if (elem.ContainsPoint(e.Location))
                {
                    temp = elem;
                }
                elem.Selected = false;
            }
            if (temp == null) return;
            temp.Selected = true;
            panel1.Invalidate();
        }

        private void СдвинутьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            foreach (GraphObject elem in elements)
            {
                if (elem.Selected == true)
                {
                    elem.X = rnd.Next(750);
                    elem.Y = rnd.Next(320);
                    panel1.Invalidate();

                }

                elem.Selected = false;

            }
        }

        private void RadioButton1_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void Panel1_Click(object sender, EventArgs e)
        {

        }
    }
}
