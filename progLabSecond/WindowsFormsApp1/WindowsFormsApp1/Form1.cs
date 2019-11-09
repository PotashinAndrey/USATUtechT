using System;
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
            AddFigure();
        }

        private void ToolStripButton3_Click(object sender, EventArgs e)
        {
            ClearFigures();
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
            AddFigure();
        }

        private void ОчиститьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ClearFigures();
        }

        private void ДобавитьToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            AddFigure();
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
            elements.Add(new GraphObject());
            panel1.Invalidate();
        }

        public void ClearFigures()
        {
        
        }

        private void Panel1_Paint(object sender, PaintEventArgs e)
        {
            foreach (GraphObject elem in elements)
            {
                elem.Draw(e.Graphics);
            }
        }
    }
}
