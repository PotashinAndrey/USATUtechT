using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp2
{

    public partial class Form1 : Form
    {
        
        public class Controller : IController
        {
            public IModel Model { get => model; set => this.model = value; }
            List<IView> views = new List<IView>();
            IModel model = new MyModel();

            static Random r = new Random();

            public void Add()
            {
                model.AddNode(r.Next(100));
                foreach (IView v in views) v.UpdateView();
            }

            public void UpdateThenLoaded()
            {
                foreach (IView v in views) v.UpdateView();
            }

            public void AddView(IView v)
            {
                views.Add(v);
            }

            public void Remove()
            {
                model.RemoveLastNode();
                foreach (IView v in views) v.UpdateView();
            }

        }

        IController controller;
        IModel model;
        IView labView;
        IView panelView;
        //public IModel Model { get; set; }

        public Form1()
        {
            InitializeComponent();

            controller = new Controller();
            model = new MyModel();

            labView = new LabelView(label1);
            labView.Model = model;
            controller.AddView(labView);

            PanelView pan;

            //pan = new PanelView();
            pan = panelView1;
            pan.Model = model;
            pan.BorderStyle = BorderStyle.FixedSingle;
            controller.AddView(pan);

            //panelView = new PanelView(panelView1);
            //panelView1.Model = Model;
            //controller.AddView(panelView);
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            controller.UpdateThenLoaded();
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            controller.Add();
        }

        private void Button2_Click(object sender, EventArgs e)  
        {
            controller.Remove();
        }

        private void PanelView1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void DataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}


