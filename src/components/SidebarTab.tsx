// type tabProp = {

// }

// const SidebarTab = (prop) => {
//   return (
//     <div className={`${isOpen ? "" : "nav-tab closed"}`} key={item.id}>
//       <div
//         // Todo
//         className={`nav-item  ${item.id === "" ? "active" : ""}`}
//         onClick={() => item.hasSubmenu && toggleMenu(item.id)}>
//         <i>{item.icon}</i>
//         {isOpen && <span className="nav-label">{item.label}</span>}

//         {/* Badge */}
//         {item.badge && isOpen && (
//           <span
//             className="badge"
//             style={
//               item.badge.color
//                 ? {
//                     background: `${item.badge.color}20`,
//                     color: item.badge.color,
//                   }
//                 : undefined
//             }>
//             {item.badge.count}
//           </span>
//         )}

//         {/* Submenu */}
//         {item.hasSubmenu && isOpen && (
//           <i
//             style={{ marginLeft: "auto" }}
//             className={expandedMenus.includes(item.id) ? "rotated" : ""}>
//             ▼
//           </i>
//         )}
//       </div>

//       {item.submenu && expandedMenus.includes(item.id) && isOpen && (
//         <div className="sub-menu">
//           {item.submenu.map((subItem) => (
//             <div key={subItem.id} className="nav-item">
//               {subItem.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SidebarTab;
