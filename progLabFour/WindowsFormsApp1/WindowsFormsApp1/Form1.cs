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
    public partial class Form1 : Form, IController
    {
        //List<IView> views = new List<IView>();
        IModel model;

        public Form1()
        {
            InitializeComponent();

            IView labView;
            labView = new LabelView(label1);
            Model = new MyModel();
            model = Model;
            labView.Model = model;
            AddView(labView);

            PanelView panelView;
            panelView = panelView1;
            panelView.Model = model;
            panelView.BorderStyle = BorderStyle.FixedSingle;
            AddView(panelView);

            MyDataGrid myDataGrid = new MyDataGrid();
            myDataGrid.Model = model;
            myDataGrid.FuseGrid(dataGridView1);
            AddView(myDataGrid);
        }

        public IModel Model { get => model; set => model = value; }

        public void Add()
        {
            model.AddNode(r.Next(100));
            //foreach (IView v in views) v.UpdateView();
        }

        public void AddView(IView v)
        {
            //views.Add(v);
            model.Changed += new Action(v.UpdateView);
        }

        public void Remove()
        {
            model.RemoveLastNode();
            //foreach (IView v in views) v.UpdateView();
        }

        static Random r = new Random();

        private void Form1_Load(object sender, EventArgs e)
        {
            //foreach (IView v in views) v.UpdateView();
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            Add();
        }

        private void Button2_Click(object sender, EventArgs e)
        {
            Remove();
        }

        private void PanelView1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void PanelView1_MouseClick(object sender, MouseEventArgs e)
        {

        }
    }
}
